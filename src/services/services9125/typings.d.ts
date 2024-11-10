

declare namespace API {
  type Login = {
    username: string;
    password: string;
  };
  type LoginReq = {
    role: string;
    role_id: number;
    token: string;
    password: string;
    username: string;
    uuid: string;
  };
  type SavePosData = {
    type: string;
    name: string;
    pos: {
      "x": number;
      "y": number;
      "z": number;
      "rx": number;
      "ry": number;
      "rz": number;
    };
    "p1p2": P1p2;
    "realp1p2": P1p2;
    "filename"?: string;
    "role_id": number
  };

  type P1p2 = {
    "p1": {
      "x": number;
      "y": number;
      "z"?: number;
    },
    "p2": {
      "x": number;
      "y": number;
      "z"?: number;
    },
    "camera"?: {
      "x": number;
      "y": number;
      "z"?: number;
    };
  };
  type GetPosResultData = {
    type: string;
    name: string;
    pos: string;
    p1p2: string;
    realp1p2?: string;
    create_time: string;
    img: string;
    id: number;
  };

  type EndMoveTaskReq = {
    "speed": number;
    "end_pos": EndPos;
  };

  type EndPos = {
    "x": number;
    "y": number;
    "z": number;
    "rx": number;
    "ry": number;
    "rz": number;
  };

  type GetresultReq = {
    "user"?: number;
    "start"?: string;
    "end"?: string;
    "cycle"?: string;
    "way"?: string;
    "page"?: number;
    "per_page"?: number;
  }
  type UserData = {
    "id"?: string;
    "password"?: string;
    "name"?: string;
    "username"?: string;
    "roleid"?: string;
    "is_active"?: boolean;
  }
  type DaoxiangData = {
    "p1": {
      "x": number;
      "y": number;
      "z": number;
      "rx": number;
      "ry": number;
      "rz": number;
    },
    "p2": {
      "x": number;
      "y": number;
      "z": number;
      "rx": number;
      "ry": number;
      "rz": number;
    },
    "surface1": string;
    "surface2": string;
    "linep1": {
      "x": number;
      "y": number;
      "z": number;
      "rx": number;
      "ry": number;
      "rz": number;
    },
    "linep2": {
      "x": number;
      "y": number;
      "z": number;
      "rx": number;
      "ry": number;
      "rz": number;
    },
    "camerapos"?: {
      "x": number;
      "y": number;
      "z": number;
      "rx": number;
      "ry": number;
      "rz": number;
    },
  }
}
