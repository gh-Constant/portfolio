<template>
  <div class="retro-container">
    <canvas ref="canvasRef" class="three-canvas"></canvas>
    <div class="content-overlay" style="font-family: 'Times New Roman', serif; color: #FFFF00; padding: 20px;">
      <marquee behavior="alternate" style="background-color: #FF0000; color: #FFFFFF; padding: 10px; font-weight: bold;">
        Bienvenue sur mon Portfolio! Dernière mise à jour: 14/03/2024 - En recherche de stage!
      </marquee>

      <div style="text-align: center; margin: 20px 0;">
        <img src="https://via.placeholder.com/150x150" alt="Photo de Constant" style="border: 5px ridge #C0C0C0;">
        <h1 style="font-size: 36px; text-shadow: 2px 2px #FF00FF;">
          <span style="color: #00FF00;">C</span>
          <span style="color: #FF0000;">o</span>
          <span style="color: #FFFF00;">n</span>
          <span style="color: #00FFFF;">s</span>
          <span style="color: #FF00FF;">t</span>
          <span style="color: #FFFFFF;">a</span>
          <span style="color: #00FF00;">n</span>
          <span style="color: #FF0000;">t</span>
        </h1>
      </div>

      <table style="width: 100%; border: 3px outset #C0C0C0; background-color: rgba(0, 0, 0, 0.7); margin: 20px 0;">
        <tr>
          <td style="padding: 15px; color: #00FF00;">
            <h2 style="color: #FF00FF; text-decoration: underline;">À PROPOS DE MOI</h2>
            <p>Salut! Je suis Constant Suchet, étudiant en 1ère année d'informatique! <blink>PASSIONNÉ</blink> par le développement et la création d'expériences interactives! Depuis que j'ai découvert les balises HTML clignotantes, ma vie a changé! J'explore maintenant les mystères du CSS et les arcanes du JavaScript. J'ai déjà aidé plus de 50 CLIENTS SATISFAITS sur Fiverr à réaliser leurs rêves numériques (enfin, surtout des sites vitrines, mais c'est un début!). Mon objectif : devenir un CYBER-MAESTRO du web!</p>
            <p style="margin-top: 10px;">Je suis actuellement à la recherche d'un <strong style="color: #FFFF00;">STAGE</strong> pour mettre mes compétences (et ma collection de GIFs animés) au service d'une entreprise dynamique! Contactez-moi!</p>
          </td>
        </tr>
      </table>

      <div style="background-color: rgba(192, 192, 192, 0.7); border: 5px ridge #808080; padding: 15px; margin: 20px 0;">
        <h2 style="color: #800080; text-align: center;">⭐ MES SUPER COMPÉTENCES ⭐</h2>
        <ul style="list-style-image: url('https://raw.githubusercontent.com/gist/tracyhenry/37c17ef86e39688285aab53c1d1e9d9a/raw/329d1e79e7d7a3d829df6eb10a8c8d4a3e0ae139/bullet.gif');">
          <li style="color: #000000; margin: 10px 0;">
            <blink>HOT!</blink>
            <strong>Développement Web Front-End</strong> - HTML4 Wizard, CSS Guru (Tables, Frames, Inline Styles!), Débutant en JavaScript (Alertes et Prompts maîtrisés!)
          </li>
           <li style="color: #000000; margin: 10px 0;">
            <strong>Design Graphique</strong> - Expert <span style="font-family: 'Comic Sans MS', cursive;">Comic Sans MS</span>, Maîtrise des GIFs Scintillants, Connaissances basiques de MS Paint.
          </li>
          <li style="color: #000000; margin: 10px 0;">
            <strong>Freelance Rockstar</strong> - Plus de 50 clients ultra-satisfaits sur Fiverr (Communication par ICQ incluse!). Gestion de projet via Notepad.
          </li>
          <li style="color: #000000; margin: 10px 0;">
            <strong>Études Supérieures</strong> - 1ère année en Informatique - Major de promo (sur 2 étudiants dans ma spécialité).
          </li>
          <li style="color: #000000; margin: 10px 0;">
            <strong>Multilingue</strong> - Français (natif), Anglais (lu sur les forums GeoCities), <span style="font-family: Wingdings;">Wingdings</span> (débutant).
          </li>
           <li style="color: #000000; margin: 10px 0;">
            <strong>Hardware</strong> - Sait brancher une souris et un clavier. Peut redémarrer un modem 56k.
          </li>
        </ul>
      </div>

      <!-- *** NEW SECTION: GUESTBOOK *** -->
      <div style="background-color: rgba(255, 255, 224, 0.7); border: 4px dashed #008000; padding: 15px; margin: 20px 0;">
          <h2 style="color: #0000FF; text-align: center; font-family: 'Comic Sans MS', cursive;">~~~ MON LIVRE D'OR ~~~</h2>
          <div style="border: 1px solid #FF00FF; padding: 8px; margin-bottom: 10px; background-color: rgba(255,255,255,0.4);">
              <p style="color: #800080; font-weight: bold;">De: CoolSurfer98</p>
              <p style="color: #000000;">Wow! <blink>Super site!</blink> Les couleurs sont incroyables! Continue comme ça!</p>
              <p style="font-size: 0.8em; color: #555;">12/03/2024</p>
          </div>
          <div style="border: 1px solid #FF00FF; padding: 8px; margin-bottom: 10px; background-color: rgba(255,255,255,0.4);">
              <p style="color: #800080; font-weight: bold;">De: HTML_Fanatic</p>
              <p style="color: #000000;">Enfin un site qui utilise bien les <span style="color: red; font-weight:bold;">MARQUEES</span>! Très pro!</p>
              <p style="font-size: 0.8em; color: #555;">10/03/2024</p>
          </div>
           <div style="border: 1px solid #FF00FF; padding: 8px; margin-bottom: 10px; background-color: rgba(255,255,255,0.4);">
              <p style="color: #800080; font-weight: bold;">De: Xx_WebGoddess_xX</p>
              <p style="color: #000000;">Ton site est trop <i style="color: #FF00FF;">SWAG</i>! J'adore l'arrière plan qui bouge!</p>
              <p style="font-size: 0.8em; color: #555;">08/03/2024</p>
          </div>
          <p style="text-align: center; margin-top: 15px;"><strong style="color: #0000FF;">>>> Signez mon livre d'or! (Bientôt disponible!) <<<</strong></p>
      </div>
      <!-- *** END GUESTBOOK *** -->

      <div style="background-color: rgba(0, 0, 0, 0.7); border: 3px double #FF00FF; padding: 15px; margin: 20px 0;">
        <h2 style="color: #00FF00; text-align: center;">★ MES PROJETS TOP SECRET ★</h2>
        <div style="background-color: rgba(192, 192, 192, 0.8); margin: 10px; padding: 10px; border: 2px inset #808080;">
          <h3 style="color: #000080;">Sites Web Clients Fiverr</h3>
          <p style="color: #000000;">Plus de 50 SITES WEB créés avec passion (et beaucoup de café) pour mes clients Fiverr! De la page perso au site d'entreprise (petite taille)! <blink>100% SATISFACTION!</blink></p>
        </div>
        <div style="background-color: rgba(192, 192, 192, 0.8); margin: 10px; padding: 10px; border: 2px inset #808080;">
          <h3 style="color: #000080;">Projets Académiques (Classifiés)</h3>
          <p style="color: #000000;">NOMBREUX projets top secrets réalisés dans le cadre de mes études! Incluant un calculateur en C (qui fonctionne presque) et une base de données... sur papier! Note moyenne: 17/20!</p>
        </div>
         <div style="background-color: rgba(192, 192, 192, 0.8); margin: 10px; padding: 10px; border: 2px inset #808080;">
          <h3 style="color: #000080;">Mon Blog Perso (En Construction)</h3>
          <p style="color: #000000;">Je partagerai bientôt mes pensées les plus profondes sur les balises HTML, les meilleurs GIFs animés et l'avenir du Web 1.0!</p>
        </div>
      </div>

       <!-- *** NEW SECTION: AWARDS *** -->
      <div style="background-color: rgba(0, 0, 0, 0.75); border: 5px groove #FFFF00; padding: 15px; margin: 20px 0; text-align:center;">
          <h2 style="color: #FFFF00; text-align: center;">🏆 MES RÉCOMPENSES WEB 🏆</h2>
          <img src="https://raw.githubusercontent.com/gist/tracyhenry/37c17ef86e39688285aab53c1d1e9d9a/raw/329d1e79e7d7a3d829df6eb10a8c8d4a3e0ae139/award1.gif" alt="Cool Web Award" style="margin: 10px;">
          <img src="https://raw.githubusercontent.com/gist/tracyhenry/37c17ef86e39688285aab53c1d1e9d9a/raw/329d1e79e7d7a3d829df6eb10a8c8d4a3e0ae139/award2.gif" alt="Awesome Site Award" style="margin: 10px;">
           <img src="https://raw.githubusercontent.com/gist/tracyhenry/37c17ef86e39688285aab53c1d1e9d9a/raw/329d1e79e7d7a3d829df6eb10a8c8d4a3e0ae139/bestviewed.gif" alt="Best Viewed Award" style="margin: 10px;">
          <p style="color: #FFFFFF; margin-top: 10px;">Merci à tous ceux qui ont voté pour moi!</p>
      </div>
      <!-- *** END AWARDS *** -->

      <!-- *** NEW SECTION: LINKS *** -->
      <div style="background-color: rgba(192, 192, 192, 0.7); border: 3px solid #0000FF; padding: 15px; margin: 20px 0;">
          <h2 style="color: #0000FF; text-align: center;">🔗 LIENS COOLS 🔗</h2>
          <ul style="list-style-type: disc; text-align: center; padding-left: 0;">
              <li style="margin: 5px 0;"><a href="#" target="_blank" style="color: #FF00FF;">AltaVista Search</a></li>
              <li style="margin: 5px 0;"><a href="#" target="_blank" style="color: #FF00FF;">GeoCities (RIP)</a></li>
              <li style="margin: 5px 0;"><a href="#" target="_blank" style="color: #FF00FF;">Ask Jeeves</a></li>
              <li style="margin: 5px 0;"><a href="#" target="_blank" style="color: #FF00FF;">Le Site du Zéro (Ancêtre OpenClassrooms!)</a></li>
              <li style="margin: 5px 0;"><a href="#" target="_blank" style="color: #FF00FF;">The HTML Hell Page</a></li>
          </ul>
          <p style="text-align:center; margin-top: 15px; color: #000000;">Rejoignez mon <strong style="color: #800080;">WebRing</strong> "Passion HTML"!</p>
          <!-- Placeholder for a webring banner -->
           <img src="https://via.placeholder.com/468x60/0000FF/FFFFFF?text=Join+My+WebRing!" alt="WebRing Banner" style="display: block; margin: 15px auto; border: 1px solid #000;">
      </div>
      <!-- *** END LINKS *** -->

      <div style="text-align: center; margin-top: 30px;">
        <img src="https://raw.githubusercontent.com/gist/tracyhenry/37c17ef86e39688285aab53c1d1e9d9a/raw/329d1e79e7d7a3d829df6eb10a8c8d4a3e0ae139/construction.gif" alt="En Construction" style="margin: 10px;">
        <table style="width: 100%; border: 2px solid #FF0000; background-color: rgba(255, 255, 0, 0.8);">
          <tr>
            <td style="text-align: center; padding: 10px;">
              <p style="color: #FF0000; font-weight: bold;">
                Contact: constant.suchet@etudiant.fr
                <br>
                Discord: ConstantDev#1234
                <br>
                <blink>Fiverr: ConstantDev (⭐⭐⭐⭐⭐)</blink>
              </p>
            </td>
          </tr>
        </table>
        <p style="color: #FFFFFF; font-size: 12px;">
          Optimisé pour Netscape Navigator 4.0 en 800x600
          <br>
          Visiteurs: <span style="background: #000000; color: #00FF00; padding: 2px 5px; font-family: 'Courier New'">00000050</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import the composable instead of Three.js directly
import { useRetroParticles } from '~/composables/useRetroParticles' // Adjusted path assuming composables is at the root

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Use the composable, passing the canvas ref
useRetroParticles(canvasRef)

// No more Three.js logic directly in the component!
</script>

<style>
@keyframes blink {
  50% { opacity: 0; }
}
blink {
  animation: blink 1s step-end infinite;
  color: #FF0000;
  font-weight: bold;
}
body {
  cursor: crosshair;
  margin: 0;
  padding: 0;
  background-color: #000080; /* Fallback background */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

.retro-container {
  position: relative; /* Needed for absolute positioning of canvas */
  width: 100%;
  min-height: 100vh;
  overflow: hidden; /* Prevents content overflow issues */
}

.three-canvas {
  position: fixed; /* Fix canvas to viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Place canvas behind content */
}

.content-overlay {
  position: relative; /* Ensure content stays above canvas */
  z-index: 1;
  width: 100%;
  max-width: 900px; /* Limit content width for readability */
  margin: 0 auto; /* Center content */
  box-sizing: border-box;
}

/* Inline rgba styles remain for transparency */
table, .retro-container div[style*='background-color'] {
   /* background-color adjusted inline using rgba */
}
</style> 