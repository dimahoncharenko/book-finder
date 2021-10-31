/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/react";
import React from "react";

const defaultStyles = css`
    --radius: 2em;

    display: grid;
    border-radius: var(--radius);
    box-shadow: 0em 0em .1em gray;

    &::after
    {
        content: " ";
        background-color: hsla(0, 0%, 0%, .2);
        grid-area: 1/-1;
        border-radius: var(--radius);
    }

    > .card__thumb,
    > .card__content
    {
        grid-area: 1/-1;
    }

    > .card__thumb
    {
        min-height: 20em;
        text-align: center;

        > img
        {
            width: 100%;
            height: 100%;
            border-radius: var(--radius);
        }
    }

    > .card__content
    {
        display: flex;
        flex-direction: column;
        margin-top: auto;
        text-align: center;
        background-color: white;
        z-index: 1;
        border-bottom-right-radius: var(--radius);
        border-bottom-left-radius: var(--radius);
        width: 100%;

        h2  
        {
            font-size: clamp(.6rem, 4vw + 1em, 1rem);
            max-height: 3em;
            overflow: hidden;
        }

        p
        {
            font-size: clamp(.4rem, 4vw + 1em, .8rem);
        }

        * + *
        {
            margin: .2em 0em;
        }
    }
`;

type Props = {
    customStyles?: SerializedStyles
    image: string
    children: React.ReactNode
}

const Card = ({ image, customStyles, children }: Props) => {
    return <React.Fragment>
        <div css={[defaultStyles, customStyles]} className="card">
            <div className="card__thumb">
                <img src={image} alt=""/>
            </div>
            {children}
        </div>
    </React.Fragment>
};

type CardContentProps = {
    children: React.ReactNode
}

const CardContent = ({ children }: CardContentProps) => {
    return (
        <div className="card__content">
            {children}
        </div>
    );
}

Card.Content = CardContent; 

export default Card;