/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Loader from "react-loader-spinner";

const CSS = css`
    text-align: center;
    padding: max(1em, 5vw);
    color: white;

    > p
    {
        font-size: clamp(1rem, 2vw + .1em, 1.5rem)
    }
`;

const Loading = () => {
    return (
        <div css={CSS}>
            <Loader color="white" type="Puff" />
            <p>Загрузка</p>
        </div>
    )
};

export default Loading;