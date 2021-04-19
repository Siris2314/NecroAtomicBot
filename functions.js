module.exports = {
    verify: async function(channel, user , {time = 30000, extraYes = [], extraNo = []} = {}){
        const filter = res => {
            const value = res.content.toLowerCase();
            return(
                (user ? res.author.id === user.id : true) && 
                (yes.includes(value)) || 
                (no.includes(value)) || 
                extraYes.includes(value)|| 
                extraNo.includes(value)
            );
        };

        const verify = await channel.awaitMessages(filter, {
            max: 1,
            time
        })

        if(!verify.size) return 0;
        const choice = verify.first().content.toLowerCase();
        if (yes.includes(choice) || (extraYes.includes(choice))) return true;
        if(no.includes(choice) || (extraNo.includes(choice))) return false;
        return false;


    },

    list: function(arr, conj = "and"){
        const len = arr.length;
        if(len === 0) return "";
        if(len === 1) return arr[0];
        return `${arr.slice(0, -1).join(", ")}${len > 1 ? `${len > 2 ? "," : ""} ${conj}` : ""}${arr.slice(-1)}`
    }
}