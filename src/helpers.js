const post = async (url, data) => {
    const fetchResponse = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await fetchResponse.json();
}

export { post }