/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // défilement doux
    }
  };

  return (
    // Retourne le JSX qui définit l'apparence du menu.
    <nav>
      {/* Composant Logo affiché dans la barre de navigation */}
      <Logo />
      <ul>
        {/* Liste des liens du menu */}
        <li>
          <a href="#nos-services" onClick={(e) => scrollToSection(e, "#services")}>
            {/* Lien vers la section "Nos services" avec un défilement fluide */}
            Nos services
          </a>
        </li>
        <li>
          <a href="#nos-realisations" onClick={(e) => scrollToSection(e, "#events")}>
            {/* Lien vers la section "Nos réalisations" avec un défilement fluide */}
            Nos réalisations
          </a>
        </li>
        <li>
          <a href="#notre-equipe" onClick={(e) => scrollToSection(e, "#team")}>
            {/* Lien vers la section "Notre équipe" avec un défilement fluide */}
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={(e) => scrollToSection(e, "#contact")}>
        {/* Bouton pour aller à la section "Contact" avec un défilement fluide */}
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
