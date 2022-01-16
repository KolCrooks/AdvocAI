import "./testimonial.css";

function Testimonial({name, img, message}) {
    return(
        <div class="testimonial">
            <h2 class="testimonial">
                {name}
            </h2>
            <p class="testimonial">
                {message}
            </p>
        </div>
    )
}

export default Testimonial; 