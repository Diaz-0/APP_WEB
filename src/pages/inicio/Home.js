import React from 'react';
import './estilos.css';

export function Home() {
  return (
      <body>
        <header>
          <section class="textos-header">
            <h1>"Bienvenidos a JobBit"</h1>
            <h2>Un lugar donde sabemos que el trabajo es importante para usted</h2>
          </section>
          <div class="wave"/>
        </header>
        <main>
          <section>
            <h2 class="titulo">Nuestras Condiciones</h2>
            <div class="contenedor-sobre-nosotros">
              <img class="imagen-about-us" src="/gif/mr-burns.gif" alt="Imagen 1" />
              <div class="contenedor-textos">
                <h3><span>1</span>Buenos tratos</h3>
                <p>Trato justo y respetuoso de ambas partes (empleado/empleador).</p>
                <h3><span>2</span>Seguridad</h3>
                <p>Seguridad de que el trato se cumplirá (en caso de haber algún imprevisto, se debe avisar a la otra parte. Por obligación).</p>
                <h3><span>3</span>Buen Ambiente Laboral</h3>
                <p>Ambiente de Solidaridad, Respeto, Justicia Conmutativa y Amabilidad.</p>
                <h3><span>4</span>Cero Tolerancia</h3>
                <p>No se toleran las ofensas o prejuicios de cualquiera de ambas partes (conllevaria a la suspensión del perfil, de acuerdo a su rol).</p>
              </div>
            </div>
          </section>
          <section class="Portafolio">
            <div class="contenedor">
              <h2 class="titulo">Galería de Imagenes</h2>
              <div class="galeria-port">
                <div class="imagen-port">
                  <img src="/imagen/empleos-para-ingenieros-occmundial.jpg" alt="Imagen 1" />
                </div>
                <div class="imagen-port">
                  <img src="/imagen/image-9.webp" alt="Imagen 2" />
                </div>
                <div class="imagen-port">
                  <img src="/imagen/cuanto-gana-albanil-mexico.jpg" alt="Imagen 3" />
                </div>
                <div class="imagen-port">
                  <img src="/imagen/stock-photo-attractive-cashier-brown-apron-giving.jpg" alt="Imagen 4"/>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <div class="contenedor-footer">
            <div class="content-foo">
            </div>
          </div>
          <h2 class="titulo-final">&copy;JobBit Design<p><i>|Jesús Miguel Díaz Montejo|</i><i>|Lázaro Enrique Ehuan Jiménez|</i><i>|Julián Campechano González|</i></p></h2>
        </footer>
        </body>
);
}