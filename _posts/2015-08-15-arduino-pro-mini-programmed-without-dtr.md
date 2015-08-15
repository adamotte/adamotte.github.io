---
layout: post

title: "Programmer un Arduino Pro Mini sans ligne DTR"
subtitle: ""
excerpt: "Pour la programmation d'Arduino Pro Mini et de l'ATmega328, il faut un câble de conversion USB vers TTL. Si comme moi vous en avez acheté un pas cher sur ebay, il est surement sans DTR, indispensable normalement. Mais pas d'inquiétude, il y a un contournement !"

cover_image: arduino.jpg

categorie: électronique

tags: arduino, reset, ide, fdti, ttl, dtr, usb

---

Mes capteurs DIY sont à base d'Arduino Pro Mini 3.3V 8Mhz et de l'ATmega328. Ni connaissant pas grand chose à l'époque et pour faire des économies, j'ai commandé un câble de conversion USB vers TTL sur ebay pour pouvoir le programmer. Je n'ai alors pas vraiment prété attention à sa fiche technique, mis à part le chipset.

A la réception, surprise il n'est pas compatible. Enfin pas directement, car après quelques recherches, il y a heureusement un contournement.
<br/>

## Branchements des lignes

<center>
    <figure>
        <div class="full zoomable">
            <img src="/images/posts/usb-ttl-clone.jpg">
        </div>
        <figcaption>fig 1. Cable FTDI USB vers TTL avec chipset FT232RL</figcaption>
    </figure>
</center>

Les lignes de mon Cable USB vers TTL à bas coût :
{% highlight yaml %}
- Rouge ： VCC
- Noir : GND
- Blanc : RXD
- Vert : TXD
- jaune : RTS
- Bleu : CTS
{% endhighlight %}

Si on regarde bien de plus près les lignes en sortie de mon cable, elle ne sont en plus même pas dans le même ordre que l'Arduino Pro Mini.

Les branchements de l'Arduino Pro mini :
{% highlight yaml %}
- DTR
- TX
- RX
- GND
- VCC
- GND
{% endhighlight %}

J'ai donc du faire des rebranchements pour l'adapter. Les lignes RX/TX doivent être branchées par paire inversée, RX avec TX et vice versa.

<center>
    <figure>
        <div class="full zoomable">
            <img src="/images/posts/usb-ttl-clone-lines.jpg">
        </div>
        <figcaption>fig 2. Rebranchements pour l'arduino</figcaption>
    </figure>
</center>
<center>
    <figure>
        <div class="full zoomable">
            <img src="/images/posts/ttl-lines-arduino.jpg">
        </div>
        <figcaption>fig 3. Branchements sur l'arduino</figcaption>
    </figure>
</center>
<br/>

## Contourner la ligne DTR

La ligne DTR est indispensable pour pouvoir programmer l'ATmega328 via le bootloader. L'IDE fait passer le DTR au niveau bas et RESET l'ATmega328, le bootloader est alors actif pendant quelques secondes.

####Sans ligne DTR, il faut gérer manuellement le RESET. Ceci se fait simplement en appuyant sur le bouton RESET de l'Arduino Pro Mini et ce au bon moment, c'est à dire au moment où, dans la console de votre IDE, apparait le message de fin de compilation :

{% highlight console %}
Binary sketch size: xxxx bytes (of a 30720 byte maximum)
{% endhighlight %}

Pas besoin d'appuyer longtemps, ni de tenir le bouton enfoncé. Juste le timing compte. Si tout c'est bien déroulé, le programme est alors transféré à l'ATmega328 et vous devriez avoir le message "Done Uploading" et voilà votre Arduino Pro Mini a été programmé avec un câble USB vers TTL sans ligne DTR !
