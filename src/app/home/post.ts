export class Post {
    id: number | undefined;
    usuario: string | undefined; //TODO: Cambiar a objeto de perfil separado
    contenido: string | undefined;
    meGusta: number[] | undefined;
    fecha: string | undefined;
    meGusto?: boolean;
}
