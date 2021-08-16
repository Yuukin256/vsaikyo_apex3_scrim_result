export const calculatePlacementPoint = (placement: number | '-'): number => {
  switch (placement) {
    case 1:
      return 12;
    case 2:
      return 9;
    case 3:
      return 7;
    case 4:
      return 5;
    case 5:
      return 4;
    case 6:
    case 7:
      return 3;
    case 8:
    case 9:
    case 10:
      return 2;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return 1;
    default:
      return 0;
  }
};
