import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import ModalEvent from "../../containers/ModalEvent";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const Page = () => {
  const { data, loading, error } = useData();
  // Trie les événements par date décroissante pour obtenir le plus récent.
  const events = data?.events || [];
  // Ajout de fallback (|| []) pour éviter les erreurs si data est vide ou undefined.
  const last = [...events].sort((a, b) => new Date(b.date) - new Date(a.date))[0] || null;
  // Affiche un message pendant le chargement et en cas d’erreur provenant de l'API.
  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="error">Erreur de chargement : {error.message}</div>;
  }

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <section className="SliderContainer" data-testid="slider">
          <Slider />
        </section>

        <section className="ServicesContainer" data-testid="services">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
            {/* Réécriture de certains textes et corriger l'orthographe pour les rendre plus naturels */}
              <h3>Soirée d’entreprise</h3>
              Réunissez vos équipes dans un cadre festif pour valoriser votre entreprise.
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              Nous adaptons nos services à vos besoins pour garantir le succès de votre événement.
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Expérience digitale</h3>
              Immersion assurée avec nos contenus en réalité virtuelle, augmentée ou mixte.
            </ServiceCard>
          </div>
        </section>

        <section className="EventsContainer" data-testid="events">
          <h2 className="Title">Nos réalisations</h2>
          <EventList />
        </section>

        <section className="PeoplesContainer" data-testid="team">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d’experts dédiée à l’organisation de vos événements</p>
          <div className="ListContainer">
            <PeopleCard imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png" name="Samira" position="CEO" />
            <PeopleCard imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png" name="Jean-baptiste" position="Directeur marketing" />
            <PeopleCard imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png" name="Alice" position="CXO" />
            <PeopleCard imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png" name="Luís" position="Animateur" />
            <PeopleCard imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png" name="Christine" position="VP animation" />
            <PeopleCard imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png" name="Isabelle" position="VP communication" />
          </div>
        </section>

        <div className="FormContainer" id="contact" data-testid="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>Merci pour votre message, nous vous répondrons dans les plus brefs délais.</p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form onSuccess={() => setIsOpened(true)} onError={() => null} />
            )}
          </Modal>
        </div>
      </main>
      <footer className="row" data-testid="footer">
        <div className="col presta" data-testid="last-event">
          <h3>Notre dernière prestation</h3>
           {/*  Le dernier événement est cliquable, et s’ouvre dans une fenêtre modale (ModalEvent). */}
          {last ? (
            <Modal Content={<ModalEvent event={last} />} key={last.id}>
              {({ setIsOpened }) => (
                <EventCard
                  onClick={() => setIsOpened(true)}
                  imageSrc={last.cover}
                  title={last.title}
                  date={new Date(last.date)}
                  label={last.type}
                  small
                />
              )}
            </Modal>
          ) : (
            <p>Aucun événement récent</p>
          )}
        </div>
        <div className="col contact" data-testid="contact-info">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            {/* data-testid dans chaque section pour les tests */}
            <a href="#twitch" aria-label="Twitch"><Icon name="twitch" /></a>
            <a href="#facebook" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href="#twitter" aria-label="Twitter"><Icon name="twitter" /></a>
            <a href="#youtube" aria-label="YouTube"><Icon name="youtube" /></a>
            {/* aria-label dans les icônes réseaux sociaux pour accessibilité */}
          </div>
        </div>
        <div className="col description" data-testid="company-info">
          <Logo size="large" />
          <p>
           724 events est une agence spécialisée dans l&apos;organisation de divers événements professionnels,
      sportifs et culturels.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;
