/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

import Container from "./Container";

const CSS = css`
    --footer-bg: hsl(0, 0%, 30%);

    background-color: var(--footer-bg);
    padding: max(1em, 3vw);

    .footer__content
    {
        display: flex;
        justify-content: space-between;
    }
`;

const Footer = () => {
    return (
        <footer className="footer" css={CSS}>
            <Container width="min(10em, 100% - .5em)">
                <div className="footer__content">
                    <a href="https://github.com/dimahoncharenko?tab=repositories" target="_blank" rel="noreferrer">
                        <img src="/github.png" alt="" />
                    </a>
                    <a href="https://www.linkedin.com/in/dimahoncharenko-33a9a3218" target="_blank" rel="noreferrer">
                        <img src="/linkedin.png" alt="" />
                    </a>
                    <a href="https://www.facebook.com/#!/" target="_blank" rel="noreferrer">
                        <img src="/facebook.png" alt="" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                        <img src="/twitter.png" alt="" />
                    </a>
                </div>
            </Container>
        </footer>
    );
};  

export default Footer;