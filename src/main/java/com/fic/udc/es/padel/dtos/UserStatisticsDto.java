package com.fic.udc.es.padel.dtos;

public class UserStatisticsDto {
	
	private int gamesWinned;
	private int gamesLossed;
	
	public UserStatisticsDto() {
		super();
	}

	public UserStatisticsDto(int gamesWinned, int gamesLossed) {
		super();
		this.gamesWinned = gamesWinned;
		this.gamesLossed = gamesLossed;
	}

	public int getGamesWinned() {
		return gamesWinned;
	}

	public void setGamesWinned(int gamesWinned) {
		this.gamesWinned = gamesWinned;
	}

	public int getGamesLossed() {
		return gamesLossed;
	}

	public void setGamesLossed(int gamesLossed) {
		this.gamesLossed = gamesLossed;
	}

}
