import { useState, useRef, useEffect } from "react";
import { Taskbar } from "./Taskbar";
import { BubuDudu } from "./BubuDudu";
import { AppWindow } from "./AppWindow";
import { MemoriesApp } from "./apps/MemoriesApp";
import { TodoApp } from "./apps/TodoApp";
import { ImportantDatesApp } from "./apps/ImportantDatesApp";
import { OurStoryApp } from "./apps/OurStoryApp";
import TimeTogetherWidget from "./TimeTogetherWidget";
import { LoveLetterPopup } from "./LoveLetterPopup";
import { ConfettiPopup } from "./ConfettiPopup";
import loveWallpaper from "../assets/love-wallpaper.jpg";
import { Heart, Sparkles, Star, BookHeart, ArrowLeft } from "lucide-react";

export type AppType =
  | "memories"
  | "todo"
  | "dates"
  | "story"
  | "doyouloveme"
  | "magneticheart"
  | "valentine"
  | null;

/* small helper: try multiple candidate URLs and pick the first that exists */
async function findFirstAvailableUrl(candidates: string[]) {
  for (const raw of candidates) {
    try {
      // `fetch` GET is more reliable for static files in many servers than HEAD
      const res = await fetch(raw, { method: "GET", cache: "no-store" });
      if (res && res.ok) return raw;
    } catch (e) {
      // ignore network errors and try next candidate
    }
  }
  return null;
}

/* try to remove scrollbars inside same-origin iframe (best-effort) */
function tryHideIframeScrollbars(iframe: HTMLIFrameElement | null) {
  try {
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.documentElement.style.overflow = "hidden";
    doc.body.style.overflow = "hidden";
    doc.body.style.margin = "0";
  } catch (e) {
    // cross-origin or other: ignore
  }
}

// --- folder window component (unchanged look) ---
const FolderWindow = ({
  title,
  onClose,
  onOpenApp,
}: {
  title: string;
  onClose: () => void;
  onOpenApp: (app: AppType) => void;
}) => {
  return (
    <div className="fixed top-24 left-24 w-[520px] h-[420px] bg-white rounded-2xl shadow-xl border border-pink-200 z-50 flex flex-col">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-2xl border-b border-pink-100">
        <div className="flex items-center gap-2">
          <img src="/heart-folder.svg" alt="" className="w-6 h-6" />
          <span className="font-semibold text-pink-700">{title}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close folder"
          className="px-3 py-1 rounded-md bg-pink-400 text-white hover:bg-pink-500"
        >
          ✕
        </button>
      </div>

      {/* Content (apps inside folder) */}
      <div className="flex-1 p-6 grid grid-cols-3 gap-6 place-items-start bg-gradient-to-br from-pink-50 to-rose-50">
        {/* Do you love me app */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onOpenApp("doyouloveme")}
        >
          <img
            src="/love.png"
            alt="Do you love me"
            className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-bounce"
          />
          <span className="text-pink-700 text-sm font-medium mt-2 group-hover:scale-105 transition-transform">
            Do you love me
          </span>
        </div>

        {/* Magnetic Heart app */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onOpenApp("magneticheart")}
        >
          <img
            src="/heart.png"
            alt="Magnetic Heart"
            className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-pulse"
          />
          <span className="text-pink-700 text-sm font-medium mt-2 group-hover:scale-105 transition-transform">
            Magnetic Heart
          </span>
        </div>

        {/* Valentine app */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onOpenApp("valentine")}
        >
          <img
            src="/Valentine.png"
            alt="Will you be my Valentine"
            className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-spin"
          />
          <span className="text-pink-700 text-sm font-medium mt-2 group-hover:scale-105 transition-transform">
            Will you be my Valentine
          </span>
        </div>
      </div>
    </div>
  );
};

export const Desktop = () => {
  const [activeApp, setActiveApp] = useState<AppType>(null);
  const [minimizedApps, setMinimizedApps] = useState<AppType[]>([]);
  const [maximizedApp, setMaximizedApp] = useState<AppType | null>(null);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [resetBubuDudu, setResetBubuDudu] = useState(false);

  // folder state
  const [openFolder, setOpenFolder] = useState(false);

  // iframe refs to attempt scrollbar removal on load
  const loveIframeRef = useRef<HTMLIFrameElement | null>(null);
  const magneticIframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleBubuDuduClick = () => {
    setShowNotification(true);
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setShowLoveLetter(true);
  };

  const handleLoveLetterClose = () => {
    setShowLoveLetter(false);
    setResetBubuDudu((prev) => !prev);
  };

  const handleMinimize = (app: AppType) => {
    if (app) {
      setMinimizedApps((prev) => [...prev, app]);
      setActiveApp(null);
      if (maximizedApp === app) {
        setMaximizedApp(null);
      }
    }
  };

  const handleRestoreFromTaskbar = (app: AppType) => {
    setMinimizedApps((prev) => prev.filter((a) => a !== app));
    setActiveApp(app);
  };

  const handleToggleMaximize = (app: AppType) => {
    if (maximizedApp === app) {
      setMaximizedApp(null);
    } else {
      setMaximizedApp(app);
    }
  };

  /* ---------- special components for the two folder apps ---------- */

  /* Smart loader component for "Do you love me" — tries multiple likely paths */
  const DoYouLoveMeComponent = () => {
    const [src, setSrc] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);
    const [tried, setTried] = useState<string[]>([]);

    useEffect(() => {
      let mounted = true;
      const candidates = [
        "/do_you_love_me/do_you_love_me.html",
        "/do%20you%20love%20me/do_you_love_me.html",
        "/do you love me/do_you_love_me.html",
        "/do_you_love_me.html",
        "/do-you-love-me/do_you_love_me.html",
        "/do_you_love_me/index.html",
      ];

      (async () => {
        const found = await findFirstAvailableUrl(candidates);
        if (!mounted) return;
        setTried(candidates);
        if (found) {
          setSrc(found);
        } else {
          setSrc(null);
        }
        setChecking(false);
      })();

      return () => {
        mounted = false;
      };
    }, []);

    return (
      <div className="w-full h-full relative bg-white">
        {/* Back pill */}
        <div className="absolute top-4 left-4 z-40">
          <button
            onClick={() => {
              setActiveApp(null);
              setOpenFolder(true);
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-200/90 text-pink-700 hover:bg-pink-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
        </div>

        <div className="w-full h-full overflow-hidden">
          {checking && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-pink-600">Loading app…</div>
            </div>
          )}

          {!checking && src && (
            <iframe
              ref={loveIframeRef}
              src={src}
              title="Do you love me"
              className="w-full h-full border-0"
              onLoad={() => tryHideIframeScrollbars(loveIframeRef.current)}
              scrolling="no"
            />
          )}

          {!checking && !src && (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-lg font-semibold text-pink-700">
                  File not found
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  I tried these paths (check that the files exist in your{" "}
                  <code>public/</code> folder):
                </p>
                <ul className="mt-3 text-xs text-left list-disc list-inside text-pink-600">
                  {[
                    "/do_you_love_me/do_you_love_me.html",
                    "/do%20you%20love%20me/do_you_love_me.html",
                    "/do you love me/do_you_love_me.html",
                    "/do_you_love_me.html",
                    "/do-you-love-me/do_you_love_me.html",
                    "/do_you_love_me/index.html",
                  ].map((c) => (
                    <li key={c} className="break-all">
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm">
                  Easiest fix: move your `do_you_love_me.html`,
                  `do_you_love_me.js`, `do_you_love_me.css` into{" "}
                  <code>public/do_you_love_me/</code> (no spaces), then reload.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* Smart loader component for Magnetic Heart — tries likely paths */
  const MagneticHeartComponent = () => {
    const [src, setSrc] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      let mounted = true;
      const candidates = [
        "/magnetic-heart.html",
        "/magneticheart.html",
        "/magnetic-heart/index.html",
        "/magnetic-heart/magnetic-heart.html",
      ];
      (async () => {
        const found = await findFirstAvailableUrl(candidates);
        if (!mounted) return;
        setSrc(found);
        setChecking(false);
      })();
      return () => {
        mounted = false;
      };
    }, []);

    return (
      <div className="w-full h-full relative bg-white">
        <div className="absolute top-4 left-4 z-40">
          <button
            onClick={() => {
              setActiveApp(null);
              setOpenFolder(true);
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-200/90 text-pink-700 hover:bg-pink-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
        </div>

        <div className="w-full h-full overflow-hidden">
          {checking && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-pink-600">Loading app…</div>
            </div>
          )}

          {!checking && src && (
            <iframe
              ref={magneticIframeRef}
              src={src}
              title="Magnetic Heart"
              className="w-full h-full border-0"
              onLoad={() => tryHideIframeScrollbars(magneticIframeRef.current)}
              scrolling="no"
            />
          )}

          {!checking && !src && (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-lg font-semibold text-pink-700">
                  File not found
                </p>
                <p className="mt-2 text-sm">
                  Please make sure <code>public/magnetic-heart.html</code>{" "}
                  exists, or rename/move the file.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* Smart loader for "Will you be my Valentine" */
  const ValentineComponent = () => {
    return (
      <div className="w-full h-full relative bg-white">
        <div className="absolute top-4 left-4 z-40">
          <button
            onClick={() => {
              setActiveApp(null);
              setOpenFolder(true);
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-200/90 text-pink-700 hover:bg-pink-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
        </div>

        <iframe
          src="/Valentine/index.html"
          title="Will you be my Valentine"
          className="w-full h-full border-0"
          scrolling="no"
        />
      </div>
    );
  };

  // main apps list (unchanged except we register the two new components)
  const apps = [
    {
      id: "memories" as const,
      name: "Memories",
      icon: Sparkles,
      component: MemoriesApp,
    },
    {
      id: "todo" as const,
      name: "To do",
      icon: Heart,
      component: TodoApp,
    },
    {
      id: "dates" as const,
      name: "Important Dates",
      icon: Star,
      component: ImportantDatesApp,
    },
    {
      id: "story" as const,
      name: "Our Story",
      icon: BookHeart,
      component: OurStoryApp,
    },
    {
      id: "doyouloveme" as const,
      name: "Do you love me",
      icon: Heart,
      component: () => (
        <div className="w-full h-full flex flex-col">
          {/* Back button */}
          <button
            onClick={() => {
              setActiveApp(null);
              setOpenFolder(true);
            }}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium px-3 py-1"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <iframe
            src="/do you love me/do_you_love_me.html"
            title="Do you love me"
            className="flex-1 w-full rounded-xl border-2 border-pink-200"
          />
        </div>
      ),
    },
    {
      id: "magneticheart" as const,
      name: "Magnetic Heart",
      icon: Heart,
      component: MagneticHeartComponent,
    },
    {
      id: "valentine" as const,
      name: "Will you be my Valentine",
      icon: Heart,
      component: ValentineComponent,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat cursor-love"
      style={{ backgroundImage: `url(${loveWallpaper})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-soft/20" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Time together widget */}
      <TimeTogetherWidget />

      {/* Desktop icons (apps + new folder) */}
      <div className="absolute top-8 left-8 space-y-6">
        {apps
          .filter(
            (app) =>
              !["doyouloveme", "magneticheart", "valentine"].includes(app.id)
          )
          .map((app) => (
            <div
              key={app.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setActiveApp(app.id)}
            >
              <div
                className={`backdrop-blur-sm rounded-2xl p-4 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse ${
                  app.id === "memories"
                    ? "bg-gradient-to-br from-pink-400/80 to-purple-500/80 group-hover:from-pink-300/90 group-hover:to-purple-400/90"
                    : app.id === "todo"
                    ? "bg-gradient-to-br from-emerald-400/80 to-teal-500/80 group-hover:from-emerald-300/90 group-hover:to-teal-400/90"
                    : app.id === "dates"
                    ? "bg-gradient-to-br from-orange-400/80 to-red-500/80 group-hover:from-orange-300/90 group-hover:to-red-400/90"
                    : "bg-gradient-to-br from-rose-400/80 to-pink-500/80 group-hover:from-rose-300/90 group-hover:to-pink-400/90"
                }`}
              >
                <div className="relative transform group-hover:rotate-6 transition-transform duration-200">
                  <app.icon className="w-8 h-8 text-white drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-200" />
                  {app.id === "memories" && (
                    <span className="absolute -top-1 -right-1 text-xs animate-bounce">
                      📸
                    </span>
                  )}
                  {app.id === "todo" && (
                    <span className="absolute -top-1 -right-1 text-xs animate-bounce">
                      ✅
                    </span>
                  )}
                  {app.id === "dates" && (
                    <span className="absolute -top-1 -right-1 text-xs animate-bounce">
                      💕
                    </span>
                  )}
                  {app.id === "story" && (
                    <span className="absolute -top-1 -right-1 text-xs animate-bounce">
                      📖
                    </span>
                  )}
                </div>
              </div>
              <span className="text-white text-sm font-medium drop-shadow-lg group-hover:scale-105 transition-transform">
                {app.name}
              </span>
            </div>
          ))}

        {/* New cute heart folder */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setOpenFolder(true)}
        >
          <img
            src="/heart-folder.svg"
            alt="ik u love me"
            className="w-16 h-16 transition-transform group-hover:scale-110"
          />
          <span className="text-white text-sm font-medium drop-shadow-lg group-hover:scale-105 transition-transform">
            ik u love me
          </span>
        </div>
      </div>

      {/* Bubu & Dudu */}
      <BubuDudu
        onSpecialClick={handleBubuDuduClick}
        resetTrigger={resetBubuDudu}
      />

      {/* App windows */}
      {activeApp && (
        <AppWindow
          title={apps.find((app) => app.id === activeApp)?.name || ""}
          onClose={() => setActiveApp(null)}
          onMinimize={() => handleMinimize(activeApp)}
          isMaximized={maximizedApp === activeApp}
          onToggleMaximize={() => handleToggleMaximize(activeApp)}
        >
          {(() => {
            const app = apps.find((a) => a.id === activeApp);
            if (app) {
              const Component = app.component;
              return <Component />;
            }
            return null;
          })()}
        </AppWindow>
      )}

      {/* Custom folder window */}
      {openFolder && (
        <FolderWindow
          title="ik u love me"
          onClose={() => setOpenFolder(false)}
          onOpenApp={(appId) => {
            setActiveApp(appId);
            setOpenFolder(false);
          }}
        />
      )}

      {/* Love letter popup */}
      {showLoveLetter && <LoveLetterPopup onClose={handleLoveLetterClose} />}

      {/* Notification popup */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 z-[60]">
          <div
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-4 rounded-2xl shadow-2xl cursor-pointer animate-bounce"
            onClick={handleNotificationClick}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💌</span>
              <div>
                <p className="font-bold">New Message!</p>
                <p className="text-sm opacity-90">
                  There is a message for you 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        minimizedApps={minimizedApps}
        onRestoreApp={handleRestoreFromTaskbar}
      />
    </div>
  );
};
