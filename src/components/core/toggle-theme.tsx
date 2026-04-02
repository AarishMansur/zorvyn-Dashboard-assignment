import { useMode } from "../../store/useModeStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useMode();

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="theme-switch"
        className="peer hidden"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label
        htmlFor="theme-switch"
        className="flex items-center cursor-pointer select-none text-[12px] text-[#78768d] leading-[15px] relative
        before:content-[''] before:block before:h-[15px] before:w-[25px] before:bg-[#05012c] before:rounded-[500px] before:mr-2 before:transition-colors before:duration-125 before:ease-out
        after:content-[''] after:block after:h-[13px] after:w-[13px] after:bg-white after:rounded-[13px] after:absolute after:left-[1px] after:top-[1px] after:transition-transform after:duration-125 after:ease-out
        after:shadow-[0_3px_1px_0_rgba(37,34,71,0.05),0_2px_2px_0_rgba(37,34,71,0.1),0_3px_3px_0_rgba(37,34,71,0.05)]
        peer-checked:before:bg-[#ffb500] peer-checked:after:translate-x-[10px]"
      >
        <span className="block mr-[.3em]">Theme:</span>
        <span className="block font-bold h-[15px] overflow-hidden relative w-[25px]">
          <span
            className={`absolute left-0 top-0 transition-all duration-125 ease-out ${theme === "dark" ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
              }`}
          >
            Light
          </span>
          <span
            className={`absolute left-0 top-0 transition-all duration-125 ease-out ${theme === "dark" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
              }`}
          >
            Dark
          </span>
        </span>
      </label>
    </div>
  );
}