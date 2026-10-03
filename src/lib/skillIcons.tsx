import { FaCode, FaDatabase } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import {
  SiBootstrap,
  SiCss,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiPostgresql,
  SiSupabase,
} from 'react-icons/si';

export const skillIcons = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Flask: SiFlask,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  DSA: FaCode,
  OpenCV: SiOpencv,
  HTML: SiHtml5,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  SQL: FaDatabase,
  Git: SiGit,
  GitHub: SiGithub,
};

export function getSkillIcon(name: string): IconType {
  return Object.prototype.hasOwnProperty.call(skillIcons, name)
    ? skillIcons[name as keyof typeof skillIcons] ?? FaCode
    : FaCode;
}
