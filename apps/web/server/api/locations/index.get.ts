import { LocationsRepository } from '#server/services/repo/entity/locations.repo'

export default defineEventHandler(async (event) => {
  const repo = new LocationsRepository()

  const query = getQuery(event)
  const cityIdRaw = query.cityId

  const cityId = typeof cityIdRaw === 'string' ? cityIdRaw : undefined

  if (cityId) {
    return await repo.getByCity(cityId)
  }

  return await repo.list()
})

const images = [
  {
    source: '/images/transmission.png',
    alt: 'Фото центра',
  },
  {
    source: '/images/transmission.png',
    alt: 'Фото центра',
  },
  {
    source: '/images/transmission.png',
    alt: 'Фото центра',
  },
  {
    source: '/images/transmission.png',
    alt: 'Фото центра',
  },
  {
    source: '/images/transmission.png',
    alt: 'Фото центра',
  },
]

export const getLocations = () => [
  {
    id: 'loc-1',
    cityId: 'moscow',
    title: 'Название центра',
    address: 'г. Москва, ул. ...',
    worktime: 'Пн - Вс 9:00 - 21:00',
    phone: '+8 (800) 000-00-00',
    href: '/contacts/loc-1',
    lat: 55.75396,
    lng: 37.620393,
    metro: { title: 'Название', lineColorHex: '#22C55E' },
    images: images,
  },
  {
    id: 'loc-2',
    cityId: 'moscow',
    title: 'Название центра',
    address: 'г. Москва, ул. ...',
    worktime: 'Пн - Вс 9:00 - 21:00',
    phone: '+8 (800) 000-00-00',
    href: '/contacts/loc-2',
    lat: 55.733842,
    lng: 37.588144,
    images: images,
  },
  {
    id: 'loc-3',
    cityId: 'spb',
    title: 'Название центра',
    address: 'г. Санкт-Петербург, ул. ...',
    worktime: 'Пн - Вс 9:00 - 21:00',
    phone: '+8 (800) 000-00-00',
    href: '/contacts/loc-3',
    lat: 59.93428,
    lng: 30.335099,
    metro: { title: 'Название', lineColorHex: '#A855F7' },
    images: images,
  },
]
