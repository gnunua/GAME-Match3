import { PieceIds } from "./PieceIds";
import { PieceType } from "./PieceType";
import { SwapModel } from "./../models/SwapModel";
import { PieceData } from "./../models/PieceData";
import { AtlasKeys } from "./../../utils/AtlasKeys";

export class PieceUtils {
    public static IsAdjacent(piece1: PieceData, piece2: PieceData): boolean {
        let vertical: boolean = (piece1.col === piece2.col && Math.abs(piece1.row - piece2.row) === 1);
        let horizontal: boolean = (piece1.row === piece2.row && Math.abs(piece1.col - piece2.col) === 1);

        return vertical || horizontal;
    }

    public static getEmptyPiece(col: number, row: number): PieceData {
        return new PieceData(col, row);
    }

    public static getNewNormalPiece(col: number, row: number, pieceId = 0): PieceData {
        if (pieceId === 0) {
            let ids: Array<number> = PieceIds.ALL_NORMAL_IDS;
            let rnd: number = Math.floor(Math.random() * ids.length);
            pieceId = ids[rnd];
        }
        let pieceData: PieceData = new PieceData(col, row, PieceType.NORMAL, pieceId);

        return pieceData;
    }

    public static getNewPowerUpPiece(col: number, row: number, type: string, pieceId: number = PieceIds.RAINBOW): PieceData {
        return new PieceData(col, row, type, pieceId);
    }

    public static getNewPowerByChainLength(chainLength: number, piece: PieceData): PieceData {
        let pieceId: number;
        let pieceType: string;

        if (chainLength > 4) {
            pieceType = PieceType.RAINBOW;
            pieceId = PieceIds.RAINBOW;
        } else if (chainLength === 4) {
            let pieceTypes: Array<string> = [PieceType.COL, PieceType.ROW];
            let rndIndex = Math.floor(Math.random() * pieceTypes.length);

            pieceType = pieceTypes[rndIndex];
            pieceId = piece.pieceId;
        } else {
            return null;
        }
        return new PieceData(piece.col, piece.row, pieceType, pieceId);
    }

    public static removePieceFromListOfPieces(piece: PieceData, pieces: Array<PieceData>): void {
        let index: number = pieces.indexOf(piece);
        if (index > -1) {
            pieces.splice(index, 1);
        }
    }

    public static getAssetId(pieceId: number, pieceType: string): string {
        let preFix: Map<string, string> = new Map<string, string>();
        preFix.set(PieceType.RAINBOW, AtlasKeys.PIECE_RAINBOW + ".png");
        preFix.set(PieceType.NORMAL, AtlasKeys.PIECE_NORMAL + "_" + pieceId + ".png");
        preFix.set(PieceType.ROW, AtlasKeys.PIECE_ROW + "_" + pieceId + ".png");
        preFix.set(PieceType.COL, AtlasKeys.PIECE_COL + "_" + pieceId + ".png");

        return preFix.get(pieceType);
    }
}
