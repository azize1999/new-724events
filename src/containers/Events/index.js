import { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";


const PER_PAGE = 9;
const EventList = () => {
  const { data, error } = useData();
  
  const [type, setType] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  // Évite le recalcul à chaque rendu si data.events ne change pas
  const typeList = useMemo(() => (
    data?.events ? [...new Set(data.events.map((event) => event.type))] : []
  ), [data?.events]);

  //  optimisé des événements filtrés et du nombre de pages
  const { filteredEvents, pageNumber } = useMemo(() => {
    // Si pas de données, retourne des valeurs par défaut
    if (!data?.events) return { filteredEvents: [], pageNumber: 0 };

    const filtered = type 
      ? data.events.filter((event) => event.type === type)
      : data.events;

    // Calcul de la pagination
    const startIndex = (currentPage - 1) * PER_PAGE;
    const paginatedEvents = filtered.slice(startIndex, startIndex + PER_PAGE);
    const totalPages = Math.ceil(filtered.length / PER_PAGE);

    return {
      filteredEvents: paginatedEvents,
      pageNumber: totalPages,
    };
  }, [data?.events, type, currentPage]); // Recalcul si une de ces dépendances change


  const changeType = (newType) => {
    setCurrentPage(1); 
    setType(newType); // Met à jour le type sélectionné
  };

  return (
    <>
      {error && <div>Une erreur est survenue</div>}
      
      {data === null ? (
        <div>Chargement en cours...</div>
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => changeType(value || null)} 
            placeholder="Tous les types"
          />
          
          <div id="events" className="ListContainer">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                    />
                  )}
                </Modal>
              ))
            ) : (
              <div>Aucun événement à afficher</div>
            )}
          </div>

          {pageNumber > 1 && (
           <div className="Pagination">
      {[...Array(pageNumber).keys()].map((n) => (
        <a 
        
          key={n} 
          href="#events" 
          onClick={() => setCurrentPage(n + 1)}
        >
          {n + 1}
        </a>
      ))}
    </div>
            )}
        </>
      )}
    </>
  );
};

export default EventList;
