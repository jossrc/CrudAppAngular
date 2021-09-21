export interface Response {
    success: boolean,
    message: string
}

export interface Book {
    Id: number,
    Isbn: string,
    Titulo: string,
    Descripcion: string,
    Paginas: number,
    Stock: number,
    Precio: number,
    IdAutor: number,
    IdCategoria: number    
}

export interface ResponseBook extends Response{
    book?: Book | null
}

export interface Category {
    Id: number,
    Descripcion: string
}

export interface Author {
    Id: number,
    Nombre: string
}
