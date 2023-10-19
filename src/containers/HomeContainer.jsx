import React from "react";
import headerImg from "../assets/img/home/header.jpg";
import sectImg from "../assets/img/home/sect.jpg";

const HomeContainer = () => {
    return <div className="home-container">
        <header>
            <h1>¡Bienvenidos a 4AD Toolkit!</h1>
            <section className="img-sect">
                <div>
                    <h2>Tu Compañero Esencial para Four Against Darkness</h2>
                    <p>
                        Si eres un aventurero solitario en busca de emocionantes mazmorras y criaturas legendarias, ¡has llegado al lugar adecuado! 4AD Toolkit es tu herramienta indispensable diseñada por y para amantes de Four Against Darkness.
                        Four Against Darkness es un juego de mazmorreo en solitario que te lleva a un mundo lleno de desafíos, tesoros y peligros. Y 4AD Toolkit es la compañía perfecta para tu viaje en solitario, enriqueciendo cada momento de tu experiencia.
                    </p>
                </div>
                <img src={headerImg} alt="role playing game" />
            </section>
        </header>
        <body>
            <section className="no-img-sect">
                <h2>Requisito Esencial: El Juego Base</h2>
                <p>
                    Para sacar el máximo provecho de 4AD Toolkit, necesitas tener el juego base, Four Against Darkness, a tu lado. Nuestra webapp está diseñada para potenciar tu experiencia en las mazmorras, brindándote herramientas, recursos y diversión extra mientras exploras este emocionante mundo.
                    En 4AD Toolkit, somos defensores de la legalidad y el respeto por los derechos de propiedad intelectual. No apoyamos ni promovemos la piratería de ningún tipo. Te animamos a obtener una copia legítima de Four Against Darkness y a disfrutar del juego de la manera adecuada.
                    Mas informacion en <a href="https://www.ganeshagames.net/index.php?cPath=1_55&osCsid=b55eers6iacg73s4mpk9bsg0db">Ganesha Games 4AD</a>.
                </p>
            </section>
            <section className="img-sect">
                <img src={sectImg} alt="4ad game" />
                <div>
                    <h2>Un Mundo de Aventuras Espera</h2>
                    <p>
                        En 4AD Toolkit, compartimos tu pasión por Four Against Darkness. Nuestra webapp es un tributo al inmenso mundo de aventuras que este juego ofrece y una herramienta para potenciar tu imaginación y creatividad en cada mazmorra que explores.
                        Explora 4AD Toolkit y descubre cómo puede enriquecer tu experiencia en Four Against Darkness. Únete a nuestra comunidad de jugadores entusiastas y comparte tus experiencias mientras te aventuras en las profundidades de las mazmorras. ¡Te invitamos a ser parte de esta emocionante travesía!
                    </p>
                </div>
            </section>
        </body>
    </div>
}

export default HomeContainer;