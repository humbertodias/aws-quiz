import styles from "./Card.module.css"

type CardProps = {
    id: string,
    name: string,
    image: string,
    description: string
}


function Card( props: CardProps ){
    return (
        <section className={styles.card}>
            {props.id}
            {props.name}
            {props.image}
            {props.description}
        </section>
    )
}

export default Card

