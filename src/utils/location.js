const GOOGLE_API_KEY = 'AIzaSyBj5wkbK_bM0WOWc___d0LNELZZyk8sOmI'

export const getMapPreview = (lat, lng) => {
    const mapPreviewUri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
    return mapPreviewUri;
}

export const getAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    console.log(url)
    const response = await fetch(url)

    if(!response.ok)
        throw new Error("Unable to fetch address")
    
    const data = await response.json()
    const address = data.results[0].formatted_address;
    return address;
}