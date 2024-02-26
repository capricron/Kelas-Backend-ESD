exports.rupiahFormat = (data) => {
    data.map(item => {
        item.price = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)
    })

    return data
}