const formatText = (text) => {
    const formattedText = text.split('\n')
        .map(line => {
            line = line.trim();
            if(line.startsWith("###")){
                let l = line.substring(3);
                let text = l.trim();
                // console.log(text)
                if(/^\d+\./.test(text)){
                    // console.log(text)
                    text =  text.split(/(\*\*.*?\*\*)/g).map(part => {
                        if(part.startsWith('**') && part.endsWith("**")){
                            return <strong className="font-semibold text-xl"> {part.substring(2, part.length-2)} </strong>
                        }else {
                            return part
                        }
                    })
                }
                return <h2 className="text-xl font-bold"> {text} </h2>;
            }
            else if(line.startsWith("##")){
                return <h1 className="text-xxl font-bold"> {line.substring(2)} </h1>;
            }
            else if(line.startsWith('**')){
                return boldText(line);
            }
            else if(line.startsWith('*') || line.startsWith('-')){
                // console.log(line);
                const new_line = line.substring(1);
                const bold =  new_line.split(/(\*\*.*?\*\*)/g).map(part => {
                    if(part.startsWith('**') && part.endsWith("**")){
                        return <strong className="font-semibold"> {part.substring(2, part.length-2)} </strong>
                    }else {
                        return part
                    }
                })
                return <li> {bold}</li>
            }else if(/^\s{2,}-/.test(line)){
                // console.log(line);
                return <p> &emsp; &emsp; {line}</p>               
                
            }else if (/^\d+\./.test(line)){
                const bold =  line.split(/(\*\*.*?\*\*)/g).map(part => {
                    if(part.startsWith('**') && part.endsWith("**")){
                        return <strong> {part.substring(2, part.length-2)} </strong>
                    }else {
                        return part
                    }
                })
                return <p>&emsp; {bold}</p>
            }else{
                // console.log(line);
                return  <p> {line}</p>
            }
        })

    return formattedText;
}

const boldText = (text) => {
  const bold =  text.split(/(\*\*.*?\*\*)/g).map(part => {
        if(part.startsWith('**') && part.endsWith("**")){
            return <strong> {part.substring(2, part.length-2)} </strong>
        }else {
            return part
        }
    })

    return bold;
}

export const formaterService = {
    formatText
}