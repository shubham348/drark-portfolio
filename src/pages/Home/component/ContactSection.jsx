import React from "react";
import Code2 from "lucide-react/icons/code-2";
import BriefcaseBusiness from "lucide-react/icons/briefcase-business";
import AtSign from "lucide-react/icons/at-sign";
import Camera from "lucide-react/icons/camera";
import Mail from "lucide-react/icons/mail";
import Globe from "lucide-react/icons/globe";
const links = [
  ["mailto:shubham3480@gmail.com", "Email", Mail],
  ["https://github.com/shubham3480", "GitHub", Code2],
  ["https://www.linkedin.com", "LinkedIn", BriefcaseBusiness],
  ["https://twitter.com", "Twitter", AtSign],
  ["https://instagram.com", "Instagram", Camera],
  ["https://dribbble.com", "Dribbble", Globe],
];
export default function ContactSection() {
  return (
    <section className="final-contact" id="contact">
      <h2>CONTACT</h2>
      <p>
        Have an idea, a project or a problem to solve?
        <br />
        I’d love to hear about it.
      </p>
      <div className="socials">
        {links.map(([href, label, Icon]) => (
          <a href={href} aria-label={label} key={label}>
            <Icon size={21} strokeWidth={2.2} />
          </a>
        ))}
      </div>
    </section>
  );
}
