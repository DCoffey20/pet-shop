import React from 'react';
import BuyPetButton from './BuyPetButton';
import Header from './Header';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import API from '../util/API';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function PetTable() {
  const classes = useStyles();
  const [pets, setPets] = useState([]);
  const [displayStatus, setDisplayStatus] = useState("available");
  const [id, setId] = useState(0);

  const getPets = () => {
    API.getPetsData(displayStatus)
      .then((res) => {
        const petsData = res.data
        // console.log(petsData);
        setPets(petsData.filter(pet => pet.id < 9223372000000247000));
        // console.log(counter);

      })
      .catch(err => console.log(err));
  }

  function handleID(newId){
    setId(newId);
  }

  function updateDisplayStatus(status) {
    setDisplayStatus(status);
  }

  function idFilter (badId){
    return badId < 9223372000000246454
  }

  useEffect(async () => {
    await getPets();
  }, [displayStatus]);

  return (

    <TableContainer component={Paper}>
      <Header displayStatus={displayStatus} onChange={updateDisplayStatus} />
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell>Category</TableCell> */}
            <TableCell>Status</TableCell>
            {displayStatus === "available" &&
              <TableCell >Purchase This Pet?</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>

          {pets.map((petsInd, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="pets">
                {petsInd.name}
              </TableCell>
              {/* <TableCell >{ }</TableCell> */}
              <TableCell >{petsInd.status}</TableCell>
              {displayStatus === "available" &&
                <TableCell > <BuyPetButton pet={petsInd} id={id} onChange={handleID}/> </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PetTable;