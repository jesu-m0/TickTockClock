import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import ThemeToggleButton from '../Common/ThemeToggleButton';
import { useTranslation } from '../../i18n/useTranslation';

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 lg:w-8 lg:h-8 fill-blackOlive dark:fill-timberwolf">
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  </svg>
);

const navIcons = {
  general: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 lg:w-5 lg:h-5 fill-current">
      <path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" />
    </svg>
  ),
  audio: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-4 h-4 lg:w-5 lg:h-5 fill-current">
      <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C478.5 334.5 496 297.1 496 256s-17.5-78.5-53.2-112.2c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C559.6 398.5 592 332.1 592 256s-32.4-142.5-88.7-186.2c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
    </svg>
  ),
  advanced: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 lg:w-5 lg:h-5 fill-current">
      <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
    </svg>
  ),
};

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { to: '/settings/general', label: t.general, icon: navIcons.general },
    { to: '/settings/audio', label: t.audio, icon: navIcons.audio },
    { to: '/settings/advanced', label: t.advanced, icon: navIcons.advanced },
  ];

  return (
    <div className="pb-4 lg:pb-16">
      <div className="container mx-auto p-5">
        {/* ===== HEADER (bento grid with fixed rows) ===== */}
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 lg:gap-5 [grid-auto-rows:60px] lg:[grid-auto-rows:80px]">

          {/* Back arrow - 1x1 */}
          <div
            className="col-span-1 lg:col-start-1 lg:row-start-1 h-full rounded-3xl bg-floralWhite dark:bg-eerieBlack flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/')}
          >
            <BackArrowIcon />
          </div>

          {/* TickTockClock label - mobile: 3x1, desktop: 5x1 */}
          <div className="col-span-3 lg:col-span-5 lg:col-start-2 lg:row-start-1 h-full p-4 rounded-3xl bg-floralWhite dark:bg-eerieBlack flex items-center justify-center">
            <h1 className="font-extrabold text-timberwolf text-4xl md:text-5xl xl:text-6xl text-center">
              <span className="text-burntSienna">Tick</span>
              <span className="text-burntSienna">Tock</span>
              <span className="text-jade">Clock</span>
            </h1>
          </div>

          {/* Settings label - desktop: 5x1 */}
          <div className="hidden lg:flex lg:col-span-5 lg:col-start-7 lg:row-start-1 h-full p-4 rounded-3xl bg-floralWhite dark:bg-eerieBlack items-center justify-center">
            <h2 className="font-bold text-blackOlive dark:text-timberwolf text-3xl lg:text-4xl 2xl:text-6xl text-center">{t.settings}</h2>
          </div>

          {/* Theme toggle - 1x1 */}
          <ThemeToggleButton />
        </div>

        {/* ===== SIDEBAR + CONTENT ===== */}
        <div className="flex gap-3 lg:gap-5 mt-3 lg:mt-5">

          {/* Sidebar */}
          <div className="shrink-0 w-48 lg:w-56 rounded-3xl bg-floralWhite dark:bg-eerieBlack p-3 flex flex-col gap-1 self-start">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-sm lg:text-base transition-colors duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-jade/15 text-jade'
                    : 'text-blackOlive dark:text-timberwolf hover:bg-blackOlive/5 dark:hover:bg-blackOlive/50'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}

            {/* Auto-save notice */}
            <div className="mt-3 pt-3 border-t border-blackOlive/10 dark:border-timberwolf/10">
              <p className="text-blackOlive/40 dark:text-timberwolf/30 text-xs text-center">
                {t.settingsSavedAutomatically}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
