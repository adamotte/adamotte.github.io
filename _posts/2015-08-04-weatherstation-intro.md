---
layout: post

title: Créer sa station météo connectée
subtitle: "Partie 1 : Présentation de l'idée"
excerpt: "Partie 1 : Présentation de l'idée"

cover_image: weather-station.jpg
cover_image_caption: Station météo du Vésuve
cover_image_link: http://www.flickr.com/photos/michalo/2437693238/

categorie: domotique

tags: weatherstation, iot, diy, raspberry, arduino

---

Récent propriétaire d'un appartement aux dernières normes BBC en vigueur, et disposant entre autres :

- d'un câblage réseaux gigabit dans toutes les pièces avec baies de brassage dans le placard technique
- de télécommandes de volets roulants SOMFY dont une pour la centralisation
- d'un thermostat programmable (mais non connecté)
- d'un serveur Synology

Le terrain me semblait propice à l'exercice de ma passion, la domotique.

En cette période estivale avec de fortes chaleurs, je voulais commander mes volets roulants afin qu'il soit ouvert le matin et le soir pour donner de la lumière à mes plantes mais qu'ils se ferment d'eux-mêmes en pleine journée, lorsque la température extérieure et surtout intérieure devient trop importante. Le top serait même que cela puisse être anticipé...

Du coup, je me suis dit qu'il fallait commencer par récupérer les informations de température des différentes pièces, de les stocker pour les analyser en temps réel et en statistiques, et tant qu'à faire de les afficher via un écran d'information.

<center>
    <figure>
        <img src="/images/posts/weather-station-3.jpg" style="max-width:100%; max-height:270px;">
        <figcaption>fig 1. Station météo Netatmo®</figcaption>
    </figure>
</center>

Sur le marché, il existe deux stations météo qui avaient attiré mon attention. La première est la station météo connectée Netatmo®. Elle offre beaucoup d'indicateurs comme la qualité de l'air ou le taux d'humidité, un design élégant et une consultation des mesures via son smartphone. Mais cette dernière a pour moi des inconvénients majeurs :

- son prix ~150€ (et ~60€ le module additionnel)
- une connexion wifi
- une obligation d'envoyer ses données sur un cloud
- pas de visualisation directe

<center>
    <figure>
        <img src="/images/posts/weather-station-2.jpg" style="max-width:100%; max-height:400px;">
        <figcaption>fig 2. Station météo Oregon Scientific</figcaption>
    </figure>
</center>

La seconde est la station météo confort Oregon Scientific. Elle permet de surveiller 4 pièces séparées en un seul coup d'oeil sur l'écran LCD, et même 2 des sondes thermo et hygro disposent d'un écran LCD. Mais elle a aussi des inconvénients à mon gout comme :

- pas de sauvegarde des données
- pas d'APIs
- même si elle est parmi les plus "jolies", elle reste basique sur l'affichage

Ainsi puisqu'aucune ne satisfait mes besoins, j'ai décidé de construire la mienne, une station météo DIY (Do It Yourself / fait maison) à mi-chemin entre les deux, à base de carte Arduino Pro Mini, de Raspberry PI, de modules de communications radio ou encore d'écran LCD de PC portable.

Vous pourrez suivre pas à pas dans les articles à suivre l'avancement du projet, la présentation du matériel, des outils, des programmes...
