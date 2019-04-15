---
layout: post
title: "Self Interest"
date: 2019-03-14
description: 
image: /assets/images/posts/self_interest/IMG_3815.JPG
link_image: /assets/images/posts/self_interest/IMG_3815.JPG
---
<p>Here are some of my creations</p>

<div class="browser">
  
      <div>
      {% for image in site.static_files %}
		{% if image.path contains 'images/posts/self_interest' %}
               	<div class="grid">
			<div class="browser" data-aos="fade-in">
			<span class="browser__dots"></span>		    
			<figure class="browser__img">
			 <img src="{{ site.baseurl }}{{ image.path }}" alt="image" />
			</figure>
			</div>
		  </div>
       
		{% endif %}
	  {% endfor %}
          <!--{% if work.order == 0 or work.order == 2 or work.order == 4 %}

            {% include work-card.html %}

          {%endif %} -->
      </div>
<!--  <span class="browser__dots"></span>
  <figure class="browser__img">
    <img src="/assets/images/posts/roccia-wedding-1.jpg" alt="Roccia Wedding Website"/>
  </figure> -->
</div>
