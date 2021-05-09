export const FETCH_FILTER_SPORTS = 'FETCH_FILTER_SPORTS'
export const SAVE_FILTER_SPORT = 'SAVE_FILTER_SPORT'
export const FETCH_FILTER_SPORTS_BY_LOCALISATION = 'FETCH_FILTER_SPORTS_BY_LOCALISATION'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export const fetchFilterSports = () => ({
    type: FETCH_FILTER_SPORTS,
})

export const fetchFilterSportsByLocalisation = (query) => ({
    type: FETCH_FILTER_SPORTS_BY_LOCALISATION,
    query,
})

export const saveFilterSports = (data) => ({
    type: SAVE_FILTER_SPORT,
    data,
})

export const clearFilter = () => ({
    type: CLEAR_FILTER
})
