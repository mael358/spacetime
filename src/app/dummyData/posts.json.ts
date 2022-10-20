import { Post } from "../home/post";

export const POSTS: Post[] = [
    {
        id: 1, // no es necesario (id_post) 
        contenido: 'lorem ipsum', // texto 
        fecha: '2022-10-04', //YYYY-MM-DD
        meGusta: [ // listado de id de usuarios que dan like (JOIN)
            'dialvehid',
            'holiwis', 
            'aksjd;lk'
        ], 
        img: '',
        usuario: {
            id: 1,
            foto: '/home/mael/fotos/1.jpg', //base 64 
            email: 'marcosv200007@gmail.com',
            nombres: 'Marcos Emilio Velasquez Hidalgo',//DB: nombre
            apodo: 'mael358', 
            fecha: '2022-10-05',//YYYY-MM-DD
            password: 'a24&rkj@45./asf'
        }, 
        meGusto: true //true si el usuario se dio like a si mismo en la publicacion
    },
    { 
        id: 2, 
        contenido: 'lorem ipsum 2', 
        fecha: '2022-10-01', 
        meGusta: [
            'dialvehid',
            'holiwis', 
            'aksjd;lk'
        ], 
        img: '',
        usuario: {
            id: 2,
            foto: '/home/hveliz/fotos/1.jpg',
            email: 'hveliz@gmail.com',
            nombres: 'Harry Enrique',
            apodo: 'hveliz',
            fecha: '2022-10-13',
            password: 'a24&rkj@45./asf'
        }, 
        meGusto: false 
    }
]
