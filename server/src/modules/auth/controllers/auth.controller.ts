import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { SignInDto } from '../dtos/signIn.dto'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get()
    checkAuth(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const isSignedIn = request['session'].isVerified

        if (!isSignedIn) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

        return true
    }

    @Post('signIn')
    async signIn(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
        @Body() signInDto: SignInDto
    ) {
        const { input, output } = signInDto

        const isVerified = this.authService.verifySIWS(input, output)

        if (isVerified) {
            request['session'].isVerified = true
        }

        return isVerified
    }

    @Post('signOut')
    signOut(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        request['session'].destroy()
        return true
    }

    @Get('createSignInData')
    createSignInData() {
        return this.authService.createSignInData()
    }
}
