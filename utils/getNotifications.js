
const getNotifications = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/getNotifications`)
        const data = await res.json();
        console.log("Data:", data.notification);
        return data
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
}

export default getNotifications;