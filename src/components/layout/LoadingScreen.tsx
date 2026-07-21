import { useEffect, useState } from "react";
import mascote from "@/assets/img/brand/mascote.png";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer: number;
    const finish = () => {
      timer = window.setTimeout(() => setHidden(true), 500);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] grid place-items-center bg-creme transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <img
          src={mascote}
          alt="Carregando"
          className="animate-spin-mascote h-24 w-auto drop-shadow-[0_10px_16px_rgba(44,26,20,0.25)]"
          width={721}
          height={896}
        />
        <span className="font-display text-lg tracking-wide text-marrom">
          Sr. Trufa
        </span>
      </div>
    </div>
  );
}
