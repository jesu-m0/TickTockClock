import React from 'react';

interface SettingsCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, icon, iconColor = 'text-jade', children, className = '' }) => {
  return (
    <div className={`rounded-3xl p-5 lg:p-6 bg-floralWhite dark:bg-eerieBlack ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={iconColor}>{icon}</span>
        <h3 className="font-extrabold text-blackOlive dark:text-timberwolf text-lg lg:text-xl tracking-wider uppercase">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
