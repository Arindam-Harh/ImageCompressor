import { FaInstagram, FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
  { label: "Facebook", href: "https://facebook.com", icon: <FaFacebookF /> },
  { label: "Twitter", href: "https://x.com", icon: <FaXTwitter /> },
  { label: "GitHub", href: "https://github.com", icon: <FaGithub /> },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="cpy">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>

      <div className="socials">
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            {icon}
          </a>
        ))}
      </div>
    </footer>
  );
};