import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainTable() {
    const [AssignmentMarksClicked, setAssignmentMarksClicked] = useState(false)
    const [catMarks, setCatmarks] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [cat, setCat] = useState(null || String);
    const [catMarksClicked, setCatMarksClicked] = useState(false);
    const [AssignmentMarks, setAssignmentMarks] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [position, setPosition] = useState("bottom");

    const fetchid = ((index:number)=>{
        if(index >= 21 ) return index+1;
        else return index;
    })

    const fetchCatMarks = async (id: number, cat: string) => {
        setCat(cat);
        setCatMarksClicked(true);
        setSelectedId(id);
    };

    useEffect(() => {
        const getPersonInfo = async () => {
            const response = await axios.get("https://backend1.oserver.workers.dev/");
            const data = response.data;
            setUserInfo(data);
        };
        getPersonInfo();
    }, []);

    useEffect(() => {
        if (selectedId !== 0 && cat) {
            const fetchMarks = async () => {
                const response = await axios.get(`https://backend1.oserver.workers.dev/fetchCatMarks/${selectedId}/${cat}`);
                const data = response.data;
                setCatmarks(data);
            };
            fetchMarks();
        }
    }, [selectedId, cat]);

    useEffect(()=>{
        const fetchMarks = async () => {
            const response = await axios.get(`https://backend1.oserver.workers.dev/fetchAssignmentMarks/${selectedId}`);
            const data = response.data;
            setAssignmentMarks(data);
        };
        fetchMarks();
    },[selectedId])

    return (
        <div>
            {catMarksClicked && (
                <div className="fixed top-1/2 left-1/2 border-2 border-black transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-50">
                    <div className="text-right">
                        <Button
                            className="hover:cursor-pointer  bg-red-500 text-white rounded hover:text-black"
                            onClick={() => {
                                setCatMarksClicked(false);
                            }}
                        >
                            Close
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead className="text-right">Marks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {catMarks.map((mark: any, index) => (
                                <TableRow key={index}>
                                    <TableCell>{mark.SubjName}</TableCell>
                                    <TableCell className="text-right">
                                        {mark.U1 + mark.U2 + mark.U3 + mark.U4 + mark.U5}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {AssignmentMarksClicked && (
                <div className="fixed top-1/2 left-1/2 border-2 border-black transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-50">
                    <div className="text-right">
                        <Button
                            className="hover:cursor-pointer  hover:text-black bg-red-500 text-white rounded"
                            onClick={() => {
                                setAssignmentMarksClicked(false);
                            }}
                        >
                            Close
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>U1</TableHead>
                                <TableHead>U2</TableHead>
                                <TableHead>U3</TableHead>
                                <TableHead>U4</TableHead>
                                <TableHead>U5</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {AssignmentMarks.map((mark: any, index:number) => (
                                <TableRow key={index}>
                                    <TableCell>{mark.SubjName}</TableCell>
                                    <TableCell>{mark.U1}</TableCell>
                                    <TableCell>{mark.U2}</TableCell>
                                    <TableCell>{mark.U3}</TableCell>
                                    <TableCell>{mark.U4}</TableCell>
                                    <TableCell>{mark.U5}</TableCell>
                                    <TableCell>
                                        {mark.U1 + mark.U2 + mark.U3 + mark.U4 + mark.U5}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <Table className={`relative ${catMarksClicked || AssignmentMarksClicked ? 'blur-lg' : ''}`}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Roll Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Marks</TableHead>
                    </TableRow>
                </TableHeader>
                {userInfo.map((user: any, index) => (
                    <TableBody key={index}>
                        <TableRow>
                            <TableCell key={index + 100000}>{user[0].RollNumber}</TableCell>
                            <TableCell key={index}>{user[0].Name}</TableCell>
                            <TableCell key={index + 33425} className="text-right">
                                <span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="border-2 bg-blue-600 text-white hover:text-black" variant="secondary">
                                                CAT
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56 bg-gray-900 text-white">
                                            <DropdownMenuLabel>Select CAT</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                                <DropdownMenuRadioItem
                                                    onClick={() => {
                                                        fetchCatMarks(33425 + fetchid(index), "cat1");
                                                    }}
                                                    value="top"
                                                >
                                                    CAT 1
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem
                                                    onClick={() => {
                                                        fetchCatMarks(33425 + fetchid(index), "cat2");
                                                    }}
                                                    value="bottom"
                                                >
                                                    CAT 2
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem
                                                    onClick={() => {
                                                        fetchCatMarks(33425 + fetchid(index), "cat3");
                                                    }}
                                                    value="right"
                                                >
                                                    CAT 3
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </span>
                                <span>
                                    <Button onClick={()=>{
                                        setAssignmentMarksClicked(true)
                                        setSelectedId(33425 + fetchid(index))}} className="border-2 bg-blue-600 text-white rounded-md hover:text-black" variant="secondary">
                                        Assignment
                                    </Button>
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </div>
    );
}
