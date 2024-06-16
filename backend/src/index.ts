import { Hono } from 'hono'
import { cors } from 'hono/cors'
const app = new Hono()
app.use('/*',cors())
app.get('/fetchCatMarks/:id/:cat', async (c) => {
  const { id, cat }: any = c.req.param();
  let catNumber: String = "";
  if (cat === 'cat1') {
    catNumber = 'CA TEST 1'
  }
  else if (cat === 'cat2') {
    catNumber = 'CA TEST 2'
  }
  else if (cat === 'cat3') {
    catNumber = 'CA TEST 3'
  }
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
  myHeaders.append("Accept-Language", "en-US,en;q=0.9,en-IN;q=0.8");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Content-Type", "application/json; charset=UTF-8");
  myHeaders.append("Referer", "http://rajalakshmi.in/UI/Modules/Profile/Profile.aspx?FormHeading=myProfile");
  myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const raw = `{\"PersonId\": ${id},\"Semester\":4,\"Category\":0}`;

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  try {
    const response = await fetch("http://rajalakshmi.in/UI/Modules/HRMS/ManageStaffStudent/UniPersonInfo.asmx/BindInternalMarks", requestOptions);
    const result: any = await response.json();
    const final_result = JSON.parse(result.d);
    const filtered_results = final_result.filter((obj: any) => {
      if (obj.EventTitle.includes(catNumber)) {
        console.log(obj.EventTitle)
        console.log(catNumber)
        return true;
      }
    })
    console.log(filtered_results)
    return c.json(filtered_results)

  } catch (error) {
    console.error(error);
  };
})

app.get('/fetchAssignmentMarks/:id', async (c) => {
  const { id } = c.req.param()
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
  myHeaders.append("Accept-Language", "en-US,en;q=0.9,en-IN;q=0.8");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Content-Type", "application/json; charset=UTF-8");
  myHeaders.append("Referer", "http://rajalakshmi.in/UI/Modules/Profile/Profile.aspx?FormHeading=myProfile");
  myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const raw = `{\"PersonId\":${id},\"Semester\":4,\"Category\":0}`;

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  try {
    const response = await fetch("http://rajalakshmi.in/UI/Modules/HRMS/ManageStaffStudent/UniPersonInfo.asmx/BindInternalMarks", requestOptions);
    const result: any = await response.json();
    const final_result = JSON.parse(result.d);
    const filtered_results = final_result.filter((obj: any) => {
      if (obj.EventTitle.includes('ASSIGNMENT')) {
        return true;
      }
    })
    return c.json(filtered_results)

  } catch (error) {
    console.error(error);
  };
})
app.get('/', async (c) => {
  const final_result:any = [];
  const promises = []
  
  for (let i = 33425; i < 33425 + 66; i++) {
    promises.push(getInfo(i));
  }
  try{
    const results = await Promise.all(promises);
    results.forEach((result:any)=>{
      if(result && result.d){
      console.log(JSON.parse(result.d))
      final_result.push(JSON.parse(result.d))
      }
    })
    return c.json(final_result)
  }
  catch(error){
    console.log(error)
  }
  async function getInfo(i: number) {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,en-IN;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Origin", "http://rajalakshmi.in");
    myHeaders.append("Referer", "http://rajalakshmi.in/UI/Modules/Profile/Profile.aspx?FormHeading=myProfile");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    const raw = `{\"PersonID\":${i}}`;

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://rajalakshmi.in/UI/Modules/Profile/Profile.aspx/GetPersonInfo", requestOptions);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    };
  }
})
export default app
