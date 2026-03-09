export type UseModalReturnType = {
  modalName: string
  openModal: () => void
  closeModal: () => void
  isModalOpen: () => boolean
}

export type CitySelectModalUiSettings = {
  readonly title: string
  readonly search_placeholder: string
  readonly empty_text: string
}

export type ShopModalUiSettings = {
  readonly title: string
  readonly form_aria_label: string
  readonly car_label: string
  readonly car_placeholder: string
  readonly vin_label: string
  readonly vin_placeholder: string
  readonly submit_label: string
}

export type SignupModalUiSettings = {
  readonly title: string
  readonly description: string
  readonly image_source: string
  readonly image_alt: string
  readonly form_aria_label: string
  readonly name_label: string
  readonly name_placeholder: string
  readonly submit_label: string
}

export type ModalWindowsUiSettings = {
  readonly city_select: CitySelectModalUiSettings
  readonly shop: ShopModalUiSettings
  readonly signup: SignupModalUiSettings
}
