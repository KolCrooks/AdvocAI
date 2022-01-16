import "./testimonial.css";
import Testimonial from './testimonial';

function Testimonials() { 
    return(
        <div class="section-testimonials">
            <h1 class="section-title section-title-testimonials">Testimonials</h1>
            <h2 class="section-subtitle section-subtitle-testimonials">See what our users have to say about Devil's Avocado</h2>
            <div class="testimonial-items">
                <Testimonial name="Kol Crooks" message="I fired my attorney because Devil's Avocado covers it all. Instead of going to court for allgedly money laundering, I gambled it all away." />
                <Testimonial name="Yeojun Han" message="I accidentally took home a computer from the computer lab. I found a loophole in the system! Thanks Devil's Avocado!" />
                <Testimonial name="Cyrus Kalafchi" message="I fell down the stairs and accidentally crushed someone's grandmother. I avoided paying for her new hip thakns to Devil's Avocado!" />
                <Testimonial name="Lance Tan 02" message="I jaywalked in UBC property, right in front of the police car. I immediately asked Devil's Avocado and got away with a verbal warning. Best advice ever." />
            </div>
        </div>
    )
}

export default Testimonials;