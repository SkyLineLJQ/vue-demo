import request from '@/utils/request'

export function findPokemonList(data) {
  return request({
    url: '/pokemon/findPokemonList',
    method: 'post',
    data
  })
}

export function createOrUpdatePokemon(data) {
  return request({
    url: '/pokemon/createOrUpdatePokemon',
    method: 'post',
    data
  })
}

export function batchUpdatePokmonStatusByCodes(data) {
  return request({
    url: '/pokemon/batchUpdatePokmonStatusByCodes',
    method: 'post',
    data
  })
}

export function checkPokemonIndexOrName(data) {
  return request({
    url: '/pokemon/checkPokemonIndexOrName',
    method: 'post',
    data
  })
}

export function findPokemonDetailBypokemonCode(data) {
  return request({
    url: '/pokemon/findPokemonDetailBypokemonCode',
    method: 'post',
    data
  })
}
