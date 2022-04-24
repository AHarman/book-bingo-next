import { Button, Input, InputLabel } from "@mui/material";
import React, { FormEvent, ReactElement, useState } from "react";

interface SearchFormProps {
    onSubmit: (query: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps): ReactElement {
    const [searchText, setSearchText] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        onSubmit(searchText);
    }

    return <form onSubmit={handleSubmit}>
        <InputLabel>
            Enter search term:
            <Input type="text" name="searchText" value={searchText} required onChange={e => setSearchText(e.target.value)} />
            <Button type="submit">Search</Button>
        </InputLabel>
    </form>;
}

