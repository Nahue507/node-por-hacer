const { deepStrictEqual } = require('assert');
const fs = require('fs')

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('DB/data.json', data, (err) => {
        if (err) throw err;
        console.log('Tarea guardada con exito');
    })
}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../DB/data.json');

    } catch (error) {

        listadoPorHacer = [];


    }


}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, estado) => {

    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = estado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();
    nuevoListado = listadoPorHacer.filter(tarea => { tarea.descripcion !== descripcion });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false
    } else {
        listadoPorHacer = nuevoListado;
        return true
        guardarDB();
    }


}

const crear = (descripcion) => {
    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;


}


module.exports = {
    getListado,
    crear,
    actualizar,
    borrar
}