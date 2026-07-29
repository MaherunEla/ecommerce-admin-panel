import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { ApiError } from "../../errors/ApiError.js";
import prisma from "../../lib/prisma.js";
export const createMedia = async (payload) => {
    return prisma.media.create({
        data: payload,
    });
};
export const getMedia = async () => {
    return prisma.media.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
export const getMediaById = async (id) => {
    const media = await prisma.media.findUnique({
        where: {
            id,
        },
    });
    if (!media) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Media not found");
    }
    return media;
};
export const updateMedia = async (id, payload) => {
    const media = await prisma.media.findUnique({
        where: {
            id,
        },
    });
    if (!media) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Media not found");
    }
    return prisma.media.update({
        where: {
            id,
        },
        data: payload,
    });
};
export const deleteMedia = async (id) => {
    const media = await prisma.media.findUnique({
        where: {
            id,
        },
    });
    if (!media) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Media not found");
    }
    await prisma.media.delete({
        where: {
            id,
        },
    });
    return;
};
