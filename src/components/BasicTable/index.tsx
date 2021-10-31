/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";

const CSS = css`
    display: grid;
    grid-auto-rows: auto;
    grid-auto-columns: auto;
    padding: max(1em, 2vw);
`;

type Props = {
    children: React.ReactNode
}

const BasicTable = ({ children }: Props) => {
    return (
        <div className="table" css={CSS}>
            {children}
        </div>
    );
};

export default BasicTable;