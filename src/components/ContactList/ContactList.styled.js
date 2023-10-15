import { styled } from 'styled-components';

export const List = styled('ul')(()=>{
  return {
    listStyle: 'none',
    padding: '0',
    width: '330px',
    margin: '0 auto',
    textAlign: 'center',
  }
})

export const Item = styled('div')(()=>{
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    borderRadius: '10px',

    '&:nth-child(2n)': {
      // background: 'lightgrey',
    },
  }
})

export const Row = styled('div')(()=>{
  return {
    fontSize: '15px',
    fontWeight: '700',
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export const BtnDel = styled('button')(()=>{
  return {
    cursor: 'pointer',
    border: '0',
    borderRadius: '10px',
    background: 'lightblue',
    padding: '7px',
    margin: '2px 2px 2px 10px',

    transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',

    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.25) 0 4px 10px',
      transform: 'translateY(-2px)',
    },
  }
})
