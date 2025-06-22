/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault(); // Empêche le comportement normal du lien
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Défilement fluide
    }
  };

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a href="#nos-services" onClick={(e) => scrollToSection(e, "services")}>
            Nos services
          </a>
        </li>
        <li>
          <a href="#nos-realisations" onClick={(e) => scrollToSection(e, "events")}>
            Nos réalisations
          </a>
        </li>
        <li>
          <a href="#notre-equipe" onClick={(e) => scrollToSection(e, "team")}>
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={(e) => scrollToSection(e, "contact")}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
