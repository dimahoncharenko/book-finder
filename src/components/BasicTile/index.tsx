/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";

type Props = {
    children: React.ReactNode
    onClick?: () => void
    color?: string
}

type Context = {
    onClick?: () => void
}

const TileContext = React.createContext<Context>({ onClick: () => {} });

const useTileContext = () => {
    const context = React.useContext(TileContext);
    if (!context) {
        throw new Error("The compounds components must be inside of BasicTile component!");
    }
    return context;
}

const BasicTile = ({ children, onClick, color }: Props) => {
    const value = { onClick };

    return (
        <TileContext.Provider value={value}>
            <div 
                css={css`
                    --bg-color: ${color};
                    padding: max(.2em, 1vw + .1em);
                    background-color: var(--bg-color, yellow);
              `} 
                className="tile">
                {children}
            </div>
        </TileContext.Provider>
    );
};

type TileContentProps = {
    children: React.ReactNode
}

const TileContent = ({ children }: TileContentProps) => {
    const { onClick } = useTileContext();

    const headerStyles = css`
        font-size: clamp(1rem, 2vw + .1em, 2rem);
        margin: 0;
    `;

    return (
        <h1 onClick={onClick} css={headerStyles} className="tile__header">
            {children}
        </h1>
    );
};

BasicTile.Content = TileContent;

export default BasicTile;