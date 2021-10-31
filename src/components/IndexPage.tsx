import Container from "./Container";
import SearchForm from "./SearchForm";
import BooksTable from "./BooksTable";
import { useRootSelector } from "../redux/hooks";
import { selectBooks } from "../redux/reducers/books";

const IndexPage = () => {
    const books = useRootSelector(selectBooks);
    
    return (
        <>
            <Container width="min(60ch, 100% - 2em)">
                <SearchForm/>
            </Container>
            <Container width="min(50em, 100% - 2em)">
                <BooksTable books={books}/>
            </Container>
        </>
    );
};

export default IndexPage;