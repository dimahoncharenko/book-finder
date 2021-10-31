/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from "@emotion/react";

type Props = {
    children: React.ReactNode,
    width?: string
}

const Container = ({ children, width }: Props) => {
    return (
        <div css={{
            width: width || "min(1024px, 100% - 2em)",
            margin: "auto"
        }}>
            {children}
        </div>
    );
};

export default Container;